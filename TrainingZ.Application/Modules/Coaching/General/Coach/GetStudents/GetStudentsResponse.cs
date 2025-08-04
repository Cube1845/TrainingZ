using TrainingZ.Domain.Interfaces;

namespace TrainingZ.Application.Modules.Coaching.General.Coach.GetStudents;

public record GetStudentsResponse(List<IAppUser> Students);