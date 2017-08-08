export { User } from '../../../app/shared/classes/user';

import { User } from '../../../app/shared/classes/user';

export class MockUserData {
  public NewUser: User = new User('foo@foo.com', '1');

  public ExistingUser1: User = new User('foo.bar@foo.com', '1', new Date(), new Date());
  public ExistingUser2: User = new User('bar.foo@bar.com', '2', new Date(), new Date());
  public Users: Array<User> = [
    this.ExistingUser1,
    this.ExistingUser2
  ];
}
