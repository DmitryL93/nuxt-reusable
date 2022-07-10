export interface IUserAdress {
  city: string
  geo: { lat: string; lng: string }
  street: string
  suite: string
  zipcode: string
}

export interface IUserCompany {
  bs: string
  catchPhrase: string
  name: string
}

export interface IUser {
  id: number
  name: string
  email: string
  phone: string
  username: string
  website: string
  address: IUserAdress
  company: IUserCompany
}
