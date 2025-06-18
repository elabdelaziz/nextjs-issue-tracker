import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const Issues = () => {
  return (
    <div>
      <Link href="issues/new">
        <Button>Issues</Button>
      </Link>
    </div>
  );
};

export default Issues;
