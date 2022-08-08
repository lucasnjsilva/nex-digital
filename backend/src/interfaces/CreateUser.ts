export default interface ICreateUser {
  id: string;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
