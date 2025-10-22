using TrainingZ.Domain.Enums;

namespace TrainingZ.Application.Modules.Coaching.Planner.Coach.Save;

public class SaveTrainingEndpoint : Endpoint<SaveTrainingPlanRequest>
{
    public override void Configure()
    {
        Put("coaching/planner");
        Roles(Role.Coach.ToString());
    }

    public override async Task HandleAsync(SaveTrainingPlanRequest req, CancellationToken ct)
    {
        
    }
}
