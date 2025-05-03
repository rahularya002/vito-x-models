import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react"
import { notFound } from "next/navigation"

// Mock model request data
const mockRequests = {
  "1": {
    id: "1",
    status: "pending",
    created_at: "2023-08-15T10:30:00Z",
    updated_at: "2023-08-15T10:30:00Z",
    portfolio_images: ["/models/model-1.jpg", "/models/model-2.jpg", "/models/model-3.jpg"],
    height: "5'9\"",
    weight: "130 lbs",
    measurements: "34-26-36",
    experience: "3 years",
    bio: "I've been modeling for 3 years, primarily in fashion and commercial photography. I'm passionate about creative expression through modeling and have worked with several local brands.",
    previous_work:
      "Worked with local fashion brands including StyleCo and Urban Trends. Featured in two regional magazine editorials.",
    admin_notes: "",
    profiles: {
      id: "2",
      full_name: "Emma Johnson",
      username: "emmaj",
      avatar_url: "/model-avatar-2.jpg",
      email: "emma@example.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
    },
  },
  "2": {
    id: "2",
    status: "approved",
    created_at: "2023-07-22T14:45:00Z",
    updated_at: "2023-07-25T09:15:00Z",
    portfolio_images: ["/models/model-4.jpg", "/models/model-5.jpg"],
    height: "5'11\"",
    weight: "145 lbs",
    measurements: "36-28-38",
    experience: "5 years",
    bio: "Professional model with 5 years of experience in runway, editorial, and commercial modeling. I've worked with major brands and been featured in national campaigns.",
    previous_work:
      "Runway experience with major fashion houses. Featured in Vogue and Elle magazines. Brand ambassador for luxury cosmetics line.",
    admin_notes: "Excellent portfolio and experience. Approved for all campaign types.",
    profiles: {
      id: "4",
      full_name: "Sophia Williams",
      username: "sophiaw",
      avatar_url: "/model-avatar-4.jpg",
      email: "sophia@example.com",
      phone: "+1 (555) 987-6543",
      location: "Los Angeles, CA",
    },
  },
}

export default function ModelRequestDetail({ params }: { params: { id: string } }) {
  // Get the model request with profile data
  const request = mockRequests[params.id as keyof typeof mockRequests]

  if (!request) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/model-requests"
          className="bg-stone-900 hover:bg-stone-800 text-white p-2 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">Model Request</h1>
          <p className="text-white/60">Review application details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-stone-900 rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Portfolio Images</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {request.portfolio_images && request.portfolio_images.length > 0 ? (
                request.portfolio_images.map((image, index) => (
                  <div key={index} className="relative aspect-[3/4] rounded-lg overflow-hidden">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Portfolio image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-full h-64 flex items-center justify-center bg-stone-800 text-white/60 rounded-lg">
                  No portfolio images
                </div>
              )}
            </div>
          </div>

          <div className="bg-stone-900 rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Application Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-white/60 mb-1">Height</p>
                <p className="text-white text-lg">{request.height}</p>
              </div>
              <div>
                <p className="text-white/60 mb-1">Weight</p>
                <p className="text-white text-lg">{request.weight}</p>
              </div>
              <div>
                <p className="text-white/60 mb-1">Measurements</p>
                <p className="text-white text-lg">{request.measurements}</p>
              </div>
              <div>
                <p className="text-white/60 mb-1">Experience</p>
                <p className="text-white text-lg">{request.experience}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-white/60 mb-1">Bio</p>
                <p className="text-white">{request.bio}</p>
              </div>
            </div>
          </div>

          <div className="bg-stone-900 rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Previous Work</h2>

            {request.previous_work ? (
              <div className="space-y-4">
                <p className="text-white">{request.previous_work}</p>
              </div>
            ) : (
              <p className="text-white/60">No previous work details provided</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-stone-900 rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Applicant</h2>

            <div className="flex items-center gap-4 mb-6">
              <div className="relative h-16 w-16 rounded-full overflow-hidden bg-stone-800">
                {request.profiles?.avatar_url ? (
                  <Image
                    src={request.profiles.avatar_url || "/placeholder.svg"}
                    alt={request.profiles.full_name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-white/60 text-xl">
                    {request.profiles?.full_name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <p className="text-white font-bold text-lg">{request.profiles?.full_name}</p>
                <p className="text-white/60">@{request.profiles?.username}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-white/60 text-sm">Email</p>
                <p className="text-white">{request.profiles?.email}</p>
              </div>
              <div>
                <p className="text-white/60 text-sm">Phone</p>
                <p className="text-white">{request.profiles?.phone}</p>
              </div>
              <div>
                <p className="text-white/60 text-sm">Location</p>
                <p className="text-white">{request.profiles?.location}</p>
              </div>
              <div>
                <p className="text-white/60 text-sm">Applied on</p>
                <p className="text-white">{new Date(request.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-stone-900 rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Status</h2>

            <div className="mb-6">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  request.status === "pending"
                    ? "bg-yellow-500/20 text-yellow-500"
                    : request.status === "approved"
                      ? "bg-green-500/20 text-green-500"
                      : "bg-red-500/20 text-red-500"
                }`}
              >
                {request.status}
              </span>
            </div>

            {request.status === "pending" ? (
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 bg-green-600/20 hover:bg-green-600/30 text-green-500 py-3 rounded-lg transition-colors">
                  <CheckCircle className="h-5 w-5" />
                  Approve Application
                </button>
                <button className="w-full flex items-center justify-center gap-2 bg-red-600/20 hover:bg-red-600/30 text-red-500 py-3 rounded-lg transition-colors">
                  <XCircle className="h-5 w-5" />
                  Reject Application
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-white/60 text-sm">Decision made by</p>
                  <p className="text-white">Admin</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Decision date</p>
                  <p className="text-white">{new Date(request.updated_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Notes</p>
                  <p className="text-white">{request.admin_notes || "No notes"}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
