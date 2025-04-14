import {
  RiCalendar2Line,
  RiContactsLine,
  RiHomeLine,
  RiQuestionnaireLine,
  RiSettings3Line,
  RiStore2Line,
  RiStore3Line,
} from "react-icons/ri";

const MENUITEMS = [
  {
    title: "Dashboard",
    displayTitle: "Dashboard",
    icon: <RiHomeLine />,
    path: "/dashboard",
    type: "link",
  },
  {
    title: "Users",
    displayTitle: "Users",
    icon: <RiContactsLine />,
    type: "sub",
    children: [
      {
        title: "AddUser",
        path: "/user/create",
        displayTitle: "AddUser",
      },
      { title: "AllUsers", path: "/user", displayTitle: "AllUsers"},
    ],
  },
  {
    title: "Products",
    displayTitle: "Products",
    icon: <RiStore3Line />,
    type: "sub",
    children: [
      {
        title: "AllProducts",
        path: "/product",
        displayTitle: "All Product",
        badgeType: "badge bg-warning text-dark ml-3",
        badgeValue: 0,
      },
      {
        title: "AddProduct",
        path: "/product/create",
        displayTitle: "Add Product",
      },
    ],
  },
  {
    title: "Stores",
    displayTitle: "Store",
    icon: <RiStore2Line />,
    type: "sub",
    children: [
      {
        title: "AddStore",
        path: "/store/create",
        displayTitle: "Add Store",
      },
      {
        title: "AllStores",
        path: "/store",
        displayTitle: "All Stores",
        badgeType: "badge bg-warning text-dark ml-3",
        badgeValue: 0,
      }
    ],
  },
  {
    title: "Eventos",
    displayTitle: "Eventos",
    icon: <RiCalendar2Line />,
    type: "sub",
    children: [
      {
        title: "AddEvent",
        path: "/event/create",
        displayTitle: "Add Store",
      },
      {
        title: "AllEvents",
        path: "/event",
        displayTitle: "All Events",
        badgeType: "badge bg-warning text-dark ml-3",
        badgeValue: 0,
      }
    ],
  },
  {
    title: "Settings",
    displayTitle: "Settings",
    icon: <RiSettings3Line />,
    path: "/setting",
    type: "link",
  }
];

export default MENUITEMS;
