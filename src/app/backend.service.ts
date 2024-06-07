import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})

export class BackendService {
    constructor(private http: HttpClient) {}
    //damit Daten in alle Requesten in json format verschikt werden (kann man auch direct in request)
    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})

    };
    private token: string = "";
    login(email: string, password: string) {
        this.http.post<{ Token: string }>('http://localhost:3000/sessions', {"email" : email, "password": password}, this.httpOptions)
            .subscribe({
                next: (response) => {
                    this.token = response.Token;
                    console.log("token: " + this.token);
                },
                error: (error) => {
                    console.log(error.statusText);
                }
            }
            );
    }
}