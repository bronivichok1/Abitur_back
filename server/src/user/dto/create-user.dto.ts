import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    id:number;
	@IsNotEmpty()
    name: string;
	@IsNotEmpty()
	surname: string;
	@IsNotEmpty()
	namerus:string;
	@IsNotEmpty()
    surnamerus:string;
	@IsNotEmpty()
	surname_info:string;
	@IsNotEmpty()
	date_of_birth:string;
	citizenship:string;
	@IsNotEmpty()
	number:string;
	serialPass:string;
	@IsNotEmpty()
	PlaceOfIssue:string;
	@IsNotEmpty()
	date_of_issue:string;
	@IsNotEmpty()
	date_of_expiry:string;
	settlement_name:string;
	@IsNotEmpty()
	mobile_tel:string;
	@IsEmail()
	email:string;
	edu_date_of_issue:string;
	edu_serial_number:string;
	edu_name:string;
	sex:string;
	@IsNotEmpty()
	country:string;
	DD:string;
	religion:string;
	@IsNotEmpty()
	DataYourPeople:string;
	NameSurname:string;
	PhoneRepresantative:string;
	country_pass:string;
	NatPassw:string;
	HostelLive:string;
	numberNational:string;
	pref_faculty:string;
	nameFolder:string;
}
