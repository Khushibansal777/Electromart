import { useEffect, useState } from "react";
import api from "../api";

export default function AdminBulkEnquiries() {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    api
      .get("/bulk-enquiries")
      .then((res) => setEnquiries(res.data))
      .catch((err) => console.error("Error fetching enquiries", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        📥 Bulk Enquiries
      </h2>

      {enquiries.length === 0 ? (
        <p className="text-gray-600">No enquiries yet.</p>
      ) : (
        <div className="grid gap-6">
          {enquiries.map((e) => (
            <div
              key={e._id}
              className="border border-gray-300 p-5 rounded-md shadow bg-white"
            >
              <div className="grid sm:grid-cols-2 gap-2 text-sm">
                <p>
                  <strong>Name:</strong> {e.name}
                </p>
                <p>
                  <strong>Email:</strong> {e.email}
                </p>
                <p>
                  <strong>Phone:</strong> {e.phone}
                </p>
                <p>
                  <strong>Product:</strong> {e.product?.name || "N/A"}
                </p>
                <p>
                  <strong>Quantity:</strong> {e.quantity}
                </p>
                <p>
                  <strong>Message:</strong> {e.message || "N/A"}
                </p>
                <p className="sm:col-span-2">
                  <strong>Received:</strong>{" "}
                  {new Date(e.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="mt-4">
                <a
                  href={`mailto:${e.email}?subject=Quotation for ${e.product?.name}&body=Hi ${e.name},%0D%0A%0D%0AWe have received your bulk enquiry for ${e.product?.name}. Our team will get back to you with a quotation shortly.%0D%0A%0D%0AThank you!%0D%0A%0D%0A- MFolks Team`}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
                >
                  📧 Reply via Email
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
