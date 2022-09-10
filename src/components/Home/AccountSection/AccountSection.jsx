import React from "react";
import AccountSectionResponsive from "./AccountSectionResponsive.component";
import AccountSectionComponent from "./AccountSection.component";

export default function AccountSection({ img, full_name, email }) {
  return (
    <>
      <AccountSectionComponent img={img} full_name={full_name} email={email} />
      <AccountSectionResponsive
        img={img}
        full_name={full_name}
        email={email}
      />{" "}
    </>
  );
}
