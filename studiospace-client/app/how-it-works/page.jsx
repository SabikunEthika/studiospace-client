import HostGuarantee from "@/components/HostGuarantee";
import HowBookingWorks from "@/components/HowBookingWorks";

export default function HowItWorksPage() {
  return (
    <>
      <div className="container mx-auto px-4 pt-16 text-center md:pt-24">
        <h1 className="text-3xl font-bold md:text-4xl">How StudioSpace Works</h1>
      </div>
      <HowBookingWorks />
      <HostGuarantee />
    </>
  );
}
