import Input from "../Input/Input";
import style from "./UserForm.module.css";

function UserForm({ user, setUser }) {
  return (
    <div>
      <div className={style.formContainer}>
        <Input
          value={user}
          setValue={setUser}
          control="firstName"
          label="First Name"
          required
        />
        <Input
          value={user}
          setValue={setUser}
          control="lastName"
          label="Last Name"
          required
        />
        <Input
          value={user}
          setValue={setUser}
          control="username"
          label="UserName"
          required
        />
        <Input
          value={user}
          setValue={setUser}
          control="email"
          label="Email"
          required
        />
        <Input
          value={user}
          setValue={setUser}
          control="password"
          label="Password"
          type="password"
          required
        />
        <Input
          value={user}
          setValue={setUser}
          control="phone"
          label="Phone Number"
          required
        />
        <input
          type="checkbox"
          checked={user.isAdmin}
          onChange={(e) => setUser({ ...user, isAdmin: !user.isAdmin })}
        />
      </div>
    </div>
  );
}

export default UserForm;
