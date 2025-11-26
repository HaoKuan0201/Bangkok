// 2. 設定您的金鑰和 URL (請替換為您的實際值)
    const SUPABASE_URL = 'https://fpknobaqsycfvcftcqgq.supabase.co';
    const SUPABASE_ANON_KEY = 'sb_publishable_9aL5kTXzgwyIlG9sXX_O5Q_q8shoFmZ';

    // 3. 初始化 Supabase Client
    const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // 4. 定義非同步函式來獲取資料
    async function fetchTripData() {
        console.log('嘗試從 Supabase 讀取資料...');

        const { data, error } = await supabaseClient
            .from('T_Travel_Trips') // 選擇您建立的 trips 表格
            .select('json_data') // 只選擇儲存行程 JSON 的欄位
            .limit(1); // 因為您只插入了一筆行程資料，所以只取第一筆

        if (error) {
            console.error('從 Supabase 讀取資料失敗:', error.message);
            // 可以在這裡顯示錯誤訊息給使用者
            return null;
        }

        if (data && data.length > 0) {
            console.log('資料讀取成功！');
            // 取得完整的行程物件
            const tripDataFromDB = data[0].json_data; 
            
            // 5. 在這裡使用資料，例如：渲染到網頁上
            console.log('行程標題:', tripDataFromDB);
            // 這裡可以呼叫您的渲染函式
            // renderTripSchedule(tripDataFromDB);

            return tripDataFromDB;
        } else {
            console.log('未找到任何行程資料。');
            return null;
        }
    }

    // 頁面載入後執行
    document.addEventListener('DOMContentLoaded', fetchTripData);
