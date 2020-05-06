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

#define PROCFS_NAME "other_201222626"
#define EJECUCION "\tEjecutandose"
#define DURMIENDO "\tDurmiendo"
#define PARADO "\tParado"
#define MUERTO "\tMuerto"
#define OTRO "\tOtro"
#define ZOMBI "\tZombie"
#define IDLE "\tIdle"
static void estado(struct seq_file *m, u32 est);
static void memproc(struct seq_file *m, u64 utime, u64 stime);
struct task_struct *task;        /*    Structure defined in sched.h for tasks/processes    */
struct task_struct *task_child;        /*    Structure needed to iterate through task children    */
struct list_head *list;            /*    Structure needed to iterate through the list in each task->children struct    */
static int cpumod_show(struct seq_file *m, void *v){
  //printk(KERN_INFO "%s","LOADING MODULE\n");    /*    good practice to log when loading/removing modules    */
     
    for_each_process( task ){
                 /*    for_each_process() MACRO for iterating through each task in the os located in linux\sched\signal.h    */
        seq_printf(m,"%d\t%s",task->pid, task->comm, task->state);/*    log parent id/executable name/state    */
        estado (m, task->state);
        seq_printf(m, "\t%i", task->utime);
        seq_printf(m, "\t%i", task->stime);
 
        seq_printf(m,"\n");
        list_for_each(list, &task->children){                        /*    list_for_each MACRO to iterate through task->children    */
 
            task_child = list_entry( list, struct task_struct, sibling );    /*    using list_entry to declare all vars in task_child struct    */

            seq_printf(m, "%d\t%s",task_child->pid, task_child->comm);
            estado (m,task_child->state);
            seq_printf(m,"\n");
        }
        seq_printf(m,"##\n"); 
       
    }    
     
 
    return 0;
}
static void memproc(struct seq_file *m, u64 utime, u64 stime){

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

