using TrainingZ.Domain.Abstract;

namespace TrainingZ.Domain.Entities;

public class Notification : BaseEntity
{
    public Notification(Guid senderId, Guid receiverId, string message, DateTime createdAt)
    {
        SenderId = senderId;
        ReceiverId = receiverId;
        Message = message;
        CreatedAt = createdAt;
    }

    public Guid SenderId { get; set; }
    public Guid ReceiverId { get; set; }
    public string Message { get; set; }
}
