export class PersonelModel{
    id: number=0;
    firstName: string="";
    lastName: string="";
    profession: string="Software";
    salary:number=0;
}

export type ProfessionType=
        "Software" |
        "Teacher"|
        "Cleaner"