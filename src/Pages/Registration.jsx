import { useHistory } from "react-router-dom";

export default function Registration() {
  const history = useHistory();
  return (
    <div className="main-wrapper-form">
      <form
        className="registration-form"
        onSubmit={(e) => {
          e.preventDefault();
          fetch("http://localhost:4000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              firstName: e.target.firstName.value,
              lastName: e.target.lastName.value,
              phoneNumber: e.target.phone.value,
              avatar: "https://robohash.org/5",
            }),
          }).then(() => {
            e.target.reset();
            history.push("/");
          });
        }}
      >
        <label>First Name</label>
        <input name="firstName" />
        <label>Last Name</label>
        <input name="lastName" />
        <label>Phone Number</label>
        <input name="phone" type="tel" />
        <label>Avatar</label>
        <input name="avatar" type="url" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
