function Tab() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-end px-[16px] py-[8px] relative shrink-0 w-[42px]" data-name="Tab">
      <div aria-hidden="true" className="absolute border-[#7f56d9] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22px] not-italic relative shrink-0 text-[#7f56d9] text-[14px] text-nowrap whitespace-pre">All</p>
    </div>
  );
}

function Tab1() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[8px] relative shrink-0" data-name="Tab">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[22px] not-italic relative shrink-0 text-[#344054] text-[14px] text-nowrap whitespace-pre">Approved</p>
    </div>
  );
}

function Tab2() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[8px] relative shrink-0" data-name="Tab">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[22px] not-italic relative shrink-0 text-[#344054] text-[14px] text-nowrap whitespace-pre">Rejected</p>
    </div>
  );
}

function Tab3() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Tab">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[8px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[22px] not-italic relative shrink-0 text-[#344054] text-[14px] text-nowrap whitespace-pre">Acknowledged</p>
        </div>
      </div>
    </div>
  );
}

function TabMobile() {
  return (
    <div className="relative shrink-0 w-full" data-name="Tab Mobile">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex items-center px-[16px] py-0 relative w-full">
          <Tab />
          <Tab1 />
          <Tab2 />
          <Tab3 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e4e7ec] border-[0px_0px_2px] border-solid bottom-[-2px] left-0 pointer-events-none right-0 top-0" />
    </div>
  );
}

function Log() {
  return (
    <div className="basis-0 content-stretch flex gap-[6px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Log">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#1d2939] text-[30px]">1/25</p>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[#f79009] text-[16px]">(10%)</p>
    </div>
  );
}

function Mid() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 text-nowrap w-full whitespace-pre" data-name="Mid">
      <Log />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[#9e77ed] text-[16px]">Current Level</p>
    </div>
  );
}

function Title() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[6px] grow items-start justify-center min-h-px min-w-px not-italic relative shrink-0" data-name="Title">
      <p className="-webkit-box font-['Inter:Medium',sans-serif] font-medium leading-[22px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#1d2939] text-[14px] w-full">Senior Clinical Nurse/Specialist - Medical Surgical Basic - Level 1</p>
      <Mid />
      <p className="-webkit-box font-['Inter:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#475467] text-[12px] w-full">Minimum Log</p>
    </div>
  );
}

function Header() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center p-[12px] relative w-full">
          <Title />
        </div>
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="bg-[#fcfcfd] content-stretch flex flex-col items-start justify-center relative rounded-[6px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#e4e7ec] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Header />
    </div>
  );
}

function Log1() {
  return (
    <div className="basis-0 content-stretch flex gap-[6px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Log">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#1d2939] text-[30px]">1/25</p>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[#f79009] text-[16px]">(10%)</p>
    </div>
  );
}

function Mid1() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 text-nowrap w-full whitespace-pre" data-name="Mid">
      <Log1 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[#f04438] text-[16px]">Target Level</p>
    </div>
  );
}

function Title1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[6px] grow items-start justify-center min-h-px min-w-px not-italic relative shrink-0" data-name="Title">
      <p className="-webkit-box font-['Inter:Medium',sans-serif] font-medium leading-[22px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#1d2939] text-[14px] w-full">Senior Clinical Nurse/Specialist - Medical Surgical Basic - Level 2</p>
      <Mid1 />
      <p className="-webkit-box font-['Inter:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#475467] text-[12px] w-full">Minimum Log</p>
    </div>
  );
}

function Header1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center p-[12px] relative w-full">
          <Title1 />
        </div>
      </div>
    </div>
  );
}

function Card1() {
  return (
    <div className="bg-[#fcfcfd] content-stretch flex flex-col items-start justify-center relative rounded-[6px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#e4e7ec] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Header1 />
    </div>
  );
}

function Summary() {
  return (
    <div className="relative shrink-0 w-full" data-name="Summary">
      <div className="flex flex-col justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start justify-center px-[16px] py-0 relative w-full">
          <Card />
          <Card1 />
        </div>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[742px] items-start left-0 top-[60px] w-[402px]" data-name="Container">
      <TabMobile />
      <Summary />
    </div>
  );
}

function Menu() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="menu-01">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="menu-01">
          <path d="M3 12H21M3 6H21M3 18H21" id="Icon" stroke="var(--stroke-0, #344054)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function StatusBarIPhone15Main() {
  return (
    <div className="backdrop-blur backdrop-filter h-[60px] relative shrink-0 w-full" data-name="Status bar/iPhone 15/Main">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[60px] items-center px-[16px] py-0 relative w-full">
          <Menu />
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[30px] not-italic relative shrink-0 text-[#344054] text-[20px] text-nowrap whitespace-pre">Logbook</p>
        </div>
      </div>
    </div>
  );
}

function TitleBar() {
  return (
    <div className="absolute bg-[#fcfcfd] content-stretch flex flex-col gap-[8px] items-start justify-center left-0 top-0 w-[402px]" data-name="Title Bar">
      <div aria-hidden="true" className="absolute border-[#e4e7ec] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
      <StatusBarIPhone15Main />
    </div>
  );
}

function Button() {
  return (
    <div className="basis-0 bg-[#6172f3] grow h-[40px] min-h-px min-w-px relative rounded-[12px] shrink-0" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[40px] items-center justify-center px-[16px] py-0 relative w-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#fcfcfd] text-[16px] text-nowrap whitespace-pre">Add New Logbook</p>
        </div>
      </div>
    </div>
  );
}

function BottomNavbar() {
  return (
    <div className="absolute backdrop-blur backdrop-filter bg-gray-50 bottom-0 box-border content-stretch flex items-center justify-center left-1/2 overflow-clip p-[16px] translate-x-[-50%] w-[402px]" data-name="Bottom Navbar">
      <Button />
    </div>
  );
}

export default function LogbookListV() {
  return (
    <div className="bg-white relative size-full" data-name="Logbook List v2">
      <TitleBar />
      <BottomNavbar />
      <Container />
    </div>
  );
}