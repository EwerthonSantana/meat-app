import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Contact } from "./contact.model";
import { MEAT_API } from "app/app.api";
import { map } from "rxjs/operators";


@Injectable()
export class ContactService {


constructor(private http: HttpClient){}

checkContact(contact: Contact): Observable<string> {
return this.http.post<Contact>(`${MEAT_API}/contacts`, contact)
.pipe(map(contact => contact.id))
}


}