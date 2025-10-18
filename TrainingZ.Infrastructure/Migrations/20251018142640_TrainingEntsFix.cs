using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TrainingZ.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class TrainingEntsFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exercises_TrainingSection_TrainingSectionId",
                table: "Exercises");

            migrationBuilder.DropForeignKey(
                name: "FK_TrainingSection_TrainingUnit_TrainingUnitId",
                table: "TrainingSection");

            migrationBuilder.DropForeignKey(
                name: "FK_TrainingUnit_TrainingPlans_TrainingPlanId",
                table: "TrainingUnit");

            migrationBuilder.DropForeignKey(
                name: "FK_Workouts_TrainingUnit_TrainingUnitId",
                table: "Workouts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TrainingUnit",
                table: "TrainingUnit");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TrainingSection",
                table: "TrainingSection");

            migrationBuilder.RenameTable(
                name: "TrainingUnit",
                newName: "TrainingUnits");

            migrationBuilder.RenameTable(
                name: "TrainingSection",
                newName: "TrainingSections");

            migrationBuilder.RenameIndex(
                name: "IX_TrainingUnit_TrainingPlanId",
                table: "TrainingUnits",
                newName: "IX_TrainingUnits_TrainingPlanId");

            migrationBuilder.RenameIndex(
                name: "IX_TrainingSection_TrainingUnitId",
                table: "TrainingSections",
                newName: "IX_TrainingSections_TrainingUnitId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TrainingUnits",
                table: "TrainingUnits",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TrainingSections",
                table: "TrainingSections",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Exercises_TrainingSections_TrainingSectionId",
                table: "Exercises",
                column: "TrainingSectionId",
                principalTable: "TrainingSections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TrainingSections_TrainingUnits_TrainingUnitId",
                table: "TrainingSections",
                column: "TrainingUnitId",
                principalTable: "TrainingUnits",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TrainingUnits_TrainingPlans_TrainingPlanId",
                table: "TrainingUnits",
                column: "TrainingPlanId",
                principalTable: "TrainingPlans",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Workouts_TrainingUnits_TrainingUnitId",
                table: "Workouts",
                column: "TrainingUnitId",
                principalTable: "TrainingUnits",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exercises_TrainingSections_TrainingSectionId",
                table: "Exercises");

            migrationBuilder.DropForeignKey(
                name: "FK_TrainingSections_TrainingUnits_TrainingUnitId",
                table: "TrainingSections");

            migrationBuilder.DropForeignKey(
                name: "FK_TrainingUnits_TrainingPlans_TrainingPlanId",
                table: "TrainingUnits");

            migrationBuilder.DropForeignKey(
                name: "FK_Workouts_TrainingUnits_TrainingUnitId",
                table: "Workouts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TrainingUnits",
                table: "TrainingUnits");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TrainingSections",
                table: "TrainingSections");

            migrationBuilder.RenameTable(
                name: "TrainingUnits",
                newName: "TrainingUnit");

            migrationBuilder.RenameTable(
                name: "TrainingSections",
                newName: "TrainingSection");

            migrationBuilder.RenameIndex(
                name: "IX_TrainingUnits_TrainingPlanId",
                table: "TrainingUnit",
                newName: "IX_TrainingUnit_TrainingPlanId");

            migrationBuilder.RenameIndex(
                name: "IX_TrainingSections_TrainingUnitId",
                table: "TrainingSection",
                newName: "IX_TrainingSection_TrainingUnitId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TrainingUnit",
                table: "TrainingUnit",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TrainingSection",
                table: "TrainingSection",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Exercises_TrainingSection_TrainingSectionId",
                table: "Exercises",
                column: "TrainingSectionId",
                principalTable: "TrainingSection",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TrainingSection_TrainingUnit_TrainingUnitId",
                table: "TrainingSection",
                column: "TrainingUnitId",
                principalTable: "TrainingUnit",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TrainingUnit_TrainingPlans_TrainingPlanId",
                table: "TrainingUnit",
                column: "TrainingPlanId",
                principalTable: "TrainingPlans",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Workouts_TrainingUnit_TrainingUnitId",
                table: "Workouts",
                column: "TrainingUnitId",
                principalTable: "TrainingUnit",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
