import { HttpHeaders } from "@angular/common/http";


export let reqHeaders = new HttpHeaders();
const token = localStorage.getItem("jwt");

if (token) {
    reqHeaders = reqHeaders.set("Authorization", `Bearer ${token}`);
}