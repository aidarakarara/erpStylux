import React from "react";

export default function Loader() {
  return (
    <div className="text-center" style={{ width : '100%'}}>
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
