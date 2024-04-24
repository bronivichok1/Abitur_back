import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {File} from 'src/files/entities/file.entity'


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name: string;
    @Column()
	surname: string;
    @Column()
	surname_info:string;
    @Column()
	date_of_birth:string;
    @Column()
	citizenship:string;
    @Column()
	serial:string;
    @Column()
	number:string;
    @Column()
	PlaceOfIssue:string;
    @Column()
	date_of_issue:string;
    @Column()
	date_of_expiry:string;
    @Column()
	settlement_name:string;
    @Column()
	mobile_tel:string;
    @Column()
	email:string;
    @Column()
	edu_date_of_issue:string;
    @Column()
	edu_serial_number:string;
    @Column()
	edu_name:string;
    @Column()
	sex:number;
    @Column()
	country:number;
    @Column()
	DD:string;
    @Column()
	religion:string;
    @Column()
	DataYourPeople:string;
    @Column()
	NameSurname:string;
    @Column()
	PhoneRepresantative:string;
    @Column()
	country_pass:number;
    @Column()
	NatPassw:string;
    @Column()
	HostelLive:string;
    @Column()
	numberNational:string;
    @Column()
	pref_faculty:number;
    @Column()
    nameFolder:string;
    @OneToMany(()=>File,(file)=>file.user,{onDelete:'CASCADE'})
    file:File[];

}
