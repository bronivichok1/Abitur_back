import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    id:number;
	@IsNotEmpty()
    name: string;
	@IsNotEmpty()
	surname: string;
	@IsNotEmpty()
	surname_info:string;
	@IsNotEmpty()
	date_of_birth:string;
	citizenship:string;
	@IsNotEmpty()
	serial:string;
	@IsNotEmpty()
	number:string;
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
	sex:number;
	@IsNotEmpty()
	country:number;
	DD:string;
	religion:string;
	@IsNotEmpty()
	DataYourPeople:string;
	NameSurname:string;
	PhoneRepresantative:string;
	country_pass:number;
	NatPassw:string;
	HostelLive:string;
	numberNational:string;
	pref_faculty:number;
	nameFolder:string;
}
