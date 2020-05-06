/**
 * cpu_201222626.c
 **/
#include <linux/module.h>
#include <linux/init.h>
#include <linux/kernel.h>
#include <linux/fs.h>
#include <linux/proc_fs.h>
#include <linux/utsname.h>
#include <linux/seq_file.h>
#include <asm/uaccess.h>
#include <linux/sched/signal.h>
#include <linux/sched.h>
#include <asm/uaccess.h>   // Needed by segment descriptors
#include <asm/segment.h>
#include <linux/buffer_head.h>

#define PROCFS_NAME "cpu_201222626"
#define EJECUCION "\tEjecutandose"
#define DURMIENDO "\tDurmiendo"
#define PARADO "\tParado"
#define MUERTO "\tMuerto"
#define OTRO "\tOtro"
#define ZOMBI "\tZombie"
#define IDLE "\tIdle"
static void estado(struct seq_file *m, u32 est);

static int cpumod_show(struct seq_file *m, void *v){
  
  // Create variables
    struct file *f;
    char buf[640];
    mm_segment_t fs;
    int i;
    // Init the buffer with 0
    for(i=0;i<640;i++)
        buf[i] = 0;
    // To see in /var/log/messages that the module is operating
    printk(KERN_INFO "My module is loaded\n");
    // I am using Fedora and for the test I have chosen following file
    // Obviously it is much smaller than the 128 bytes, but hell with it =)
    f = filp_open("/proc/cpuinfo", O_RDONLY, 0);
    if(f == NULL)
        printk(KERN_ALERT "filp_open error!!.\n");
    else{
        // Get current segment descriptor
        fs = get_fs();
        // Set segment descriptor associated to kernel space
        set_fs(KERNEL_DS);
        // Read the file
        f->f_op->read(f, buf, 640,50);
        // Restore segment descriptor
        set_fs(fs);
        // See what we read from file
        printk(KERN_INFO "buf:%s\n",buf);
        seq_printf(m, "%s", buf);
    }
    filp_close(f,NULL);
    return 0;
}




static void estado(struct seq_file *m, u32 est){
  switch(est){
  case TASK_RUNNING:
    seq_printf(m, EJECUCION);
    break;
  case TASK_INTERRUPTIBLE:
  case TASK_UNINTERRUPTIBLE:
    seq_printf(m, DURMIENDO);
    break;
  case __TASK_STOPPED:
  case __TASK_TRACED:
  case TASK_STOPPED:
    seq_printf(m, PARADO);
    break;
  case EXIT_ZOMBIE:
    seq_printf(m, ZOMBI);
    break;
  case TASK_DEAD:
    seq_printf(m, MUERTO);
    break;
  case TASK_IDLE:
    seq_printf(m, IDLE);
    break;
  default:
    seq_printf(m, OTRO);
    break;
  }
}

static int cpumod_open(struct inode *inode, struct file *file){
  return single_open(file, cpumod_show, NULL);
}

static const struct file_operations cpu_fops= {
  .owner = THIS_MODULE,
  .open = cpumod_open,
  .read = seq_read,
  .llseek = seq_lseek,
  .release = single_release,
};


static int __init cpumod_init(void){
  printk(KERN_INFO "Byron Jose Lopez Herrera\n");
  proc_create(PROCFS_NAME, 0, NULL, &cpu_fops);
  printk(KERN_INFO "Completado. Proceso: /proc/%s.\n", PROCFS_NAME);

  return 0;
}

static void __exit cpumod_exit(void){
  remove_proc_entry(PROCFS_NAME, NULL);
  printk(KERN_INFO "Sistemas Operativos 1\n");
  printk(KERN_INFO "Modulo deshabilidato\n");
}

module_init(cpumod_init);
module_exit(cpumod_exit);

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Dragonsor");
MODULE_DESCRIPTION("Modulo realizado como practica de sistemas operativos1");

