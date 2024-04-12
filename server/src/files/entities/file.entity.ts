import { Entity,Column, JoinColumn,ManyToOne,PrimaryGeneratedColumn } from "typeorm";
import {User} from 'src/user/entities/user.entity'


@Entity()
export class File {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    FLink:string; 
    @ManyToOne(()=>User,(user)=>user.Files)
    @JoinColumn({name:'user_id'})
    user:User;
}

