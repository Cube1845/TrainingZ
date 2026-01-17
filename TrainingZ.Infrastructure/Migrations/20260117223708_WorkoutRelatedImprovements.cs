using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TrainingZ.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class WorkoutRelatedImprovements : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_DoneSets_DoneExerciseId",
                table: "DoneSets");

            migrationBuilder.DropColumn(
                name: "StudentFeedback",
                table: "DoneExercises");

            migrationBuilder.AddColumn<bool>(
                name: "IsDone",
                table: "DoneSets",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "SetIndex",
                table: "DoneSets",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_DoneSets_DoneExerciseId_SetIndex",
                table: "DoneSets",
                columns: new[] { "DoneExerciseId", "SetIndex" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_DoneSets_DoneExerciseId_SetIndex",
                table: "DoneSets");

            migrationBuilder.DropColumn(
                name: "IsDone",
                table: "DoneSets");

            migrationBuilder.DropColumn(
                name: "SetIndex",
                table: "DoneSets");

            migrationBuilder.AddColumn<string>(
                name: "StudentFeedback",
                table: "DoneExercises",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_DoneSets_DoneExerciseId",
                table: "DoneSets",
                column: "DoneExerciseId");
        }
    }
}
