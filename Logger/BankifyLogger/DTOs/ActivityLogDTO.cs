namespace BankifyLogger.DTOs
{
	public class ActivityLogDTO
	{
		public string UserId { get; set; }
		public string Action { get; set; }
		public string IpAddress { get; set; }
	}
}
