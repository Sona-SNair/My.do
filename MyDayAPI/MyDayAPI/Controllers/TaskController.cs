using Microsoft.AspNetCore.Mvc;
using MyDayAPI.MyDayModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyDayAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly TaskContext _context;
        public TaskController(TaskContext cont)
        {
            _context = cont;
        }
        // GET: api/<TaskController>
        [HttpGet("getalltask")]
        public IEnumerable<TaskModel> Get()
        {
            return _context.MyTasks.OrderByDescending(a => a.Date).ToList();
        }

        // GET api/<TaskController>/5
        [HttpGet("{id}")]
        public TaskModel Get(int id)
        {
            return _context.MyTasks.FirstOrDefault(item => item.TaskNo == id);
        }

        // POST api/<TaskController>
        [HttpPost("addtask")]
        public void Post([FromBody] TaskModel value)
        {
            value.UserId = value.UserId;
            value.Id = 0;
            Random random = new Random();
            value.TaskNo = random.Next(1000, 100000);
            _context.MyTasks.Add(value);
            _context.SaveChanges();
        }

        // PUT api/<TaskController>/5
        [HttpPut("update")]
        public void Put([FromBody] TaskModel value)
        {
            var obj = _context.MyTasks.AsNoTracking().FirstOrDefault(item => item.Id == value.Id);
            value.UserId = value.UserId;
            //obj.TaskName = value.TaskName;
            //obj.TaskDescription= value.TaskDescription;
            //obj.Date = value.Date;
            _context.Entry(value).State = EntityState.Modified;
            _context.SaveChanges();
        }

        // DELETE api/<TaskController>/5
        [HttpDelete("deletetask/{id}")]
        public void Delete(int id)
        {
            TaskModel obj = _context.MyTasks.FirstOrDefault(item => item.Id == id);
            _context.MyTasks.Remove(obj);
            _context.SaveChanges();
        }
    }
}

