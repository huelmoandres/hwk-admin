import {
  RiArticleLine,
  RiCoinsLine,
  RiContactsLine,
  RiCoupon2Line,
  RiCurrencyFill,
  RiExchangeDollarFill,
  RiHomeLine,
  RiImageLine,
  RiListUnordered,
  RiPagesLine,
  RiPercentLine,
  RiQuestionnaireLine,
  RiRefund2Line,
  RiSettings3Line,
  RiStore2Line,
  RiStore3Line,
  RiTruckLine,
  RiWalletLine,
  RiWindowLine,
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
        permission: ["user.create"],
      },
      { title: "AllUsers", path: "/user", displayTitle: "AllUsers", permission: ["user.index"] },
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
        permission: ["product.create"],
      }
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
        permission: ["store.create"],
      },
      {
        title: "AllStores",
        path: "/store",
        displayTitle: "All Stores",
        badgeType: "badge bg-warning text-dark ml-3",
        badgeValue: 0,
        permission: ["store.index"],
      }
    ],
  },
  {
    title: "FAQ's",
    displayTitle: "FAQ's",
    icon: <RiQuestionnaireLine />,
    path: "/faq",
    permission: ["faq.index"],
    type: "link",
  },
  {
    title: "Settings",
    displayTitle: "Settings",
    icon: <RiSettings3Line />,
    path: "/setting",
    permission: ["setting.index"],
    type: "link",
  }
];

export default MENUITEMS;
