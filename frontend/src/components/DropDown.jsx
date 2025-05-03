import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authReducer";
import { Link } from "react-router-dom";
import { persistor } from "../app/store";

const DropDown = () => {
  const user = useSelector((state) => state.authReducer);
  console.log(user);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logout());
    persistor.purge();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>
            {user.currentUser.name || user.currentUser.email}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <div>{user.currentUser.name}</div>
          <div className="text-sm">{user.currentUser.email}</div>
          <div className="text-xs font-light">{user.currentUser.country}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Link to="/add-project">Add Project</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={handleClick}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
