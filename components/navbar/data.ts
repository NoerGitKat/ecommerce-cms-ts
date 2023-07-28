export const getRoutes = (
  params: { storeId: string },
  pathname: string,
): {
  href: string;
  label: string;
  active: boolean;
}[] => {
  return [
    {
      href: `/${params.storeId}/`,
      label: "Overview",
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/${params.storeId}/settings`,
    },
  ];
};
