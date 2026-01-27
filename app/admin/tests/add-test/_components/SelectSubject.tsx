import React from "react";

const SelectSubject = ({
  subjects,
}: {
  subjects: { name: string; _id: string }[];
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {subjects.map((s, id) => (
        <div className="p-2 border rounded" key={id}>
          <p>{s.name}</p>
          <div className="text-xs text-muted-foreground">{s._id}</div>
        </div>
      ))}
    </div>
  );
};

export default SelectSubject;
