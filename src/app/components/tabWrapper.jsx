import TabPanel from '@mui/lab/TabPanel';

export default function TabWrapper({ value, children }) {
  return (
    <TabPanel className='px-0 md:px-2' value={value}>
        <div className="mt-8 rounded-xl shadow-secondarySh text-gray-800">
            {children}
        </div>
    </TabPanel>
  );
}