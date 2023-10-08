import { useListingStatus } from "../../Store/ListingStatus/useListingStatus";
import { MainTable } from "../MainTable/MainTable";
import ListingStatusForm from "./ListingStatusForm";

export default function ListingStatus() {
  const {
    listingStatus,
    loading,
    form,
    onDelete,
    addListingStatus,
    onEditListingStatus,
  } = useListingStatus();

  const columns = [
    {
      title: "№",
      dataIndex: "id",
      key: "id",
      render: (_, rec, index) => {
        return index + 1;
      },
      width: 150,
    },
    {
      title: "Nomi",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Qo`shimcha ma`lumit",
      dataIndex: "desc",
      key: "desc",
    },
  ];

  function onListingStatusEdit(e) {
    form.setFieldsValue({
      id: e?.id,
      name: e?.name,
      desc: e?.desc,
    });
  }
  const setEd = () => {
    form.setFieldsValue({
      id: "",
      name: "",
      desc: "",
    });
  };

  return (
    <div>
      <MainTable
        pdata={listingStatus}
        pcolumns={columns}
        addData={true}
        pageTitle={"Listing Status"}
        drawerOneTitle={"Status qo`shish"}
        drawerThwoTitle={"O'zgartirish"}
        add={
          <ListingStatusForm
            onFinish={addListingStatus}
            form={form}
            submitTitle="Qo`shish"
            hiddenItem={false}
          />
        }
        onDelete={onDelete}
        onEdit={onListingStatusEdit}
        edit={
          <ListingStatusForm
            hiddenItem={true}
            onFinish={onEditListingStatus}
            form={form}
            submitTitle="O`zgartirish"
          />
        }
        setEd={setEd}
        loading={loading}
      />
    </div>
  );
}
