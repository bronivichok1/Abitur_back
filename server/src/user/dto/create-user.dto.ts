import { IsEmail } from "class-validator";

export class CreateUserDto {
    id:number;
    name: string;
	surname: string;
	surname_info:string;
	date_of_birth:string;
	citizenship:string;
	serial:string;
	number:string;
	PlaceOfIssue:string;
	date_of_issue:string;
	date_of_expiry:string;
	settlement_name:string;
	mobile_tel:string;
	@IsEmail()
	email:string;
	edu_date_of_issue:string;
	edu_serial_number:string;
	edu_name:string;
	sex:number;
	country:number;
	DD:string;
	religion:string;
	DataYourPeople:string;
	NameSurname:string;
	PhoneRepresantative:string;
	country_pass:number;
	NatPassw:string;
	HostelLive:string;
	numberNational:string;
	pref_faculty:number;
	Files:string;
}
