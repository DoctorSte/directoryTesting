import React from "react";

const Founder = ({ founder }) => {
  return (
    <>
      <div className="p-6 bg-gray-800 rounded-md ">
        <img
          src={
            founder.fields["Profile Picture"]
              ? founder.fields["Profile Picture"][0].url
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/VAN_CAT.png/440px-VAN_CAT.png"
          }
          className="rounded-full w-12 h-12"
        />
        <p>Name: {founder.fields["Cofounder Name"]}</p>
        <p>I'm a {founder.fields["I'm a ... [Background]"]} person</p>
        <p>looking for a {founder.fields["Looking for ..."]} person</p>
      </div>
    </>
  );
};

export default Founder;
