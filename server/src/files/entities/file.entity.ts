import { Entity,Column, JoinColumn,ManyToOne,PrimaryGeneratedColumn } from "typeorm";
import {UserData} from 'src/user/entities/user.entity'


@Entity()
export class File {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    FLink:string; 
    @ManyToOne(()=>UserData,(user)=>user.file)
    @JoinColumn({name:'user_id'})
    user:UserData;
}

