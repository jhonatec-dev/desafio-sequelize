import { NewEntity } from "../interfaces/NewEntity";
import { Person } from "../interfaces/Person";

class PersonService {
  private readonly personModel;
  constructor() {
    this.personModel = new this.personModel();
  }
  createPerson(person: NewEntity<Person>) {

  }

}

export default new PersonService();