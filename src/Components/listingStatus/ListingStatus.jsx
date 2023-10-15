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
      className: "priority-desc",
    },
    {
      title: "Nomi UZ",
      dataIndex: "nameuz",
      key: "nameuz",
      className: "priority-desc",
    },
    {
      title: "Nomi RU",
      dataIndex: "nameru",
      key: "nameru",
      className: "priority-desc",
    },
    {
      title: "Nomi EN",
      dataIndex: "nameen",
      key: "nameen",
      className: "priority-desc",
    },
    {
      title: "Qo`shimcha ma`lumit UZ",
      dataIndex: "descuz",
      key: "descuz",
      className: "priority-desc",
    },
    {
      title: "Qo`shimcha ma`lumit RU",
      dataIndex: "descru",
      key: "descru",
      className: "priority-desc",
    },
    {
      title: "Qo`shimcha ma`lumit EN",
      dataIndex: "descen",
      key: "descen",
      className: "priority-desc",
    },
  ];

  function onListingStatusEdit(e) {
    form.setFieldsValue({
      id: e?.id,
      nameuz: e?.nameuz,
      nameru: e?.nameru,
      nameen: e?.nameen,
      descuz: e?.descuz,
      descru: e?.descru,
      descen: e?.descen,
    });
  }
  const setEd = () => {
    form.setFieldsValue({
      id: "",
      nameuz: "",
      nameru: "",
      nameen: "",
      descuz: "",
      descru: "",
      descen: "",
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
