using System.Text.Json.Serialization;

namespace BankifyLogger.DTOs
{
	public class ActivityLogDTO
	{
		[JsonPropertyName("UserId")]
		public string UserId { get; set; }
		[JsonPropertyName("Action")]
		public string Action { get; set; }
		[JsonPropertyName("IpAddress")]
		public string IpAddress { get; set; }
	}
}
