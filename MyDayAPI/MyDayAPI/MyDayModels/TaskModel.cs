using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
namespace MyDayAPI.MyDayModels
{
    public class TaskModel
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public int TaskNo { get; set; }
        public string TaskName { get; set; }
        public string TaskDescription { get; set; }
        public DateTime Date { get; set; }
        public UserModel User { get; set; }


    }
}

