import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('User')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string 

    @Column()
    email: string
    
    @Column()
    password: string

    @Column()
    fullName: string

    @Column()
    isActive: boolean

    @Column('text', {
        array: true,
    })
    roles: string[]

}
