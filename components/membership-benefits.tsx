import { Star } from 'lucide-react'

const benefits = [
  "Exclusive access to premium content",
  "Priority customer support",
  "Early access to new features",
  "Monthly industry reports",
  "Networking opportunities with other members"
]

export function MembershipBenefits() {
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-[#fccd32] mb-4">Membership Benefits</h3>
      <ul className="space-y-2">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start">
            <Star className="h-5 w-5 text-[#fccd32] mr-2 flex-shrink-0" />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

