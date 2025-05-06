export interface IDoctorAvailableChecker {
  findOneAvailable(
    specialty: string,
    schedule: { startTime: string; endTime: string },
    date: string,
  ): Promise<any>;
}
