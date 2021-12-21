using Microsoft.EntityFrameworkCore;

namespace MyDayAPI.MyDayModels
{
    public class TaskContext : DbContext
    {
        public TaskContext() { }
        public TaskContext(DbContextOptions<TaskContext> options) : base(options) { }
        public DbSet<TaskModel> MyTasks { get; set; }
        public DbSet<UserModel> Register { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TaskModel>().ToTable("tbl_Task");
            modelBuilder.Entity<UserModel>().ToTable("tbl_User");

            modelBuilder.Entity<TaskModel>()
                .HasOne(t => t.User)
                .WithMany(t => t.Tasks)
                .HasForeignKey(t => t.UserId);
        }
    }
}

