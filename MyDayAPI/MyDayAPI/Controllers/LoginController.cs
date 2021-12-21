using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyDayAPI.Helpers;
using MyDayAPI.MyDayModels;
using System.Linq;

namespace MyDayAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly TaskContext _context;
        public LoginController(TaskContext taskContext)
        {
            _context = taskContext;
        }
        [HttpGet("users")]
        public IActionResult GetUsers()
        {
            var userdetails = _context.Register.AsQueryable();
            return Ok(userdetails);
        }
        [HttpPost("signup")]
        public IActionResult SignUp([FromBody] UserModel userObj)
        {
            if (userObj == null)
            {
                return BadRequest();
            }
            else
            {
                userObj.Password = EncDscPassword.EncryptPassword(userObj.Password);
                _context.Register.Add(userObj);
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Sign up Successfully"

                });
            }
        }
        [HttpPost("login")]
        public IActionResult Login([FromBody] UserModel userObj)
        {
            if (userObj == null)
            {
                return BadRequest();
            }
            else
            {
                var user = _context.Register.Where(a => a.Email == userObj.Email).FirstOrDefault();


                if (user != null && EncDscPassword.DecryptPassword(user.Password) == userObj.Password)
                {
                    return Ok(new
                    {
                        StatusCode = 200,
                        Message = "Logged In Successfully",
                        userData = user

                    });
                }
                else
                {
                    return NotFound(new
                    {
                        StatusCode = 404,
                        Message = "User Not Found"
                    });
                }
            }
        }
    }
}
