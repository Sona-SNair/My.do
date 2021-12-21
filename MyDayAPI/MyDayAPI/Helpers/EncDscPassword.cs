using System;
using System.Text;
using System.Text.RegularExpressions;

namespace MyDayAPI.Helpers
{
    public static class EncDscPassword
    {
        public static string secretKey = "@123secretkeydontshare";
        public static string EncryptPassword(string password)
        {
            if (string.IsNullOrEmpty(password))
            {
                return "";
            }
            else
            {
                password = password + secretKey;
                var passwordinBytes = Encoding.UTF8.GetBytes(password);
                return Convert.ToBase64String(passwordinBytes);
            }

        }
        public static string DecryptPassword(string encryptedPassword)
        {
            if (string.IsNullOrEmpty(encryptedPassword))
            {
                return "";
            }
            else
            {

                //Regex regex = new Regex(@"^[\w/\:.-]+;base64,");
                //base64File = regex.Replace(base64File, string.Empty);
                var encodedBytes = Convert.FromBase64String(encryptedPassword);
                var actualPassword = Encoding.UTF8.GetString(encodedBytes);
                actualPassword = actualPassword.Substring(0, actualPassword.Length - secretKey.Length);
                return actualPassword;
            }
        }
    }
}
