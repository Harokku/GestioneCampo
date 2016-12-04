import {InMemoryDbService} from "angular-in-memory-web-api";

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let users = [
      {id: 1, surname: 'Calzavara', name: 'Roberto', dob: '1980-01-01',role: 'Capo Campo', badge_number: 'A00085'},
      {id: 2, surname: 'Pangorelli', name: 'Egidio', dob: '1990-01-01',role: 'Dipendente', badge_number: 'A00090'},
      {id: 3, surname: 'BelFusti', name: 'Rodolfo', dob: '1970-01-01',role: 'Volontario', badge_number: 'A00009'},
    ];
    let stamps = [
      {id: 1, type: 'Entrata', surname: 'BelFusti', name: 'Rodolfo', role: 'Volontario', badge_number: 'A00009', userRef: 3}
    ];
    return {users, stamps};
  }
}
