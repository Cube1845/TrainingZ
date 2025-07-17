export class StudentData {
  name: string;
  surname: string;
  readonly profileImageUrl: string;

  constructor(name: string, surname: string, profileImageUrl: string) {
    this.name = name;
    this.surname = surname;
    this.profileImageUrl = profileImageUrl;
  }
}
