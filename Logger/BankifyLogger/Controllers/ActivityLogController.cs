using BankifyLogger.DTOs;
using Microsoft.AspNetCore.Mvc;
using Serilog;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BankifyLogger.Controllers
{
	[ApiController]
	[Route("api/logs")]
	public class ActivityLogController : ControllerBase
	{

		// POST api/<ActivityLogController>
		[HttpPost]
		public IActionResult ActivityLog(ActivityLogDTO activityLogDTO )
		{
			Log.Information("UserId: {UserId} | Action: {Action} | IP: {IpAddress} | Time: {Time}",
				activityLogDTO.UserId,
				activityLogDTO.Action,
				activityLogDTO.IpAddress,
				DateTime.UtcNow);


			return Ok(new { message = "Log written to file" });
		}

	}
}
