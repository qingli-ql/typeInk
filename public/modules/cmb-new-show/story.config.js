/**
 * 《招聚韶华 向阳启航》
 * 招商银行苏州分行2026届新员工培训成长纪实
 * ------------------------------------------------------------
 * 正式内容架构：序章 → 五章 → 尾章。
 * 只需替换“素材”文件夹中的图片 / 视频 / 音频。
 */
(() => {
  const manifest = window.MEDIA_MANIFEST || { pages: {}, brand: {}, audio: '', video: '' };
  const pageFiles = (key) => Array.isArray(manifest.pages?.[key]) ? manifest.pages[key] : [];
  const fileName = (path = '') => decodeURIComponent(path.split('/').pop() || '').replace(/^\d+[_-]?/, '').replace(/\.[^.]+$/, '');
  const image = (src, alt = '', extra = {}) => ({ type: 'image', src, alt: alt || fileName(src), ...extra });
  const video = (src, poster, alt = '', extra = {}) => ({ type: 'video', src, poster, alt: alt || fileName(src), ...extra });
  const images = (key) => pageFiles(key).map((src, i) => image(src, `${key} ${i + 1}`, {
    focal: ['center', '50% 38%', '46% 56%', '60% 48%'][i % 4],
  }));
  const placeholder = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000"><rect width="100%" height="100%" fill="#d9cdbc"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" fill="#765f51" font-size="46">请替换对应素材图片</text></svg>`);
  const ensure = (items, minimum = 1, maximum = 40) => {
    const base = items.length ? items.slice(0, maximum) : [image(placeholder, '等待替换素材')];
    if (base.length >= minimum) return base;
    return Array.from({ length: minimum }, (_, i) => ({ ...base[i % base.length], alt: `${base[i % base.length].alt} ${i + 1}` }));
  };
  const pick = (key, count) => ensure(images(key), count, count);
  const many = (key, minimum, maximum = 48) => ensure(images(key), minimum, maximum);
  const departSet = many('00_depart', 20, 28);
  const meetSet = many('00_meet', 12, 20);
  const groupSet = many('00_group', 16, 32);
  const shekouSet = pick('01_shekou', 3);
  const changeSet = many('01_change', 14, 28);
  const longtermSet = many('01_longterm', 14, 28);
  const suzhouRootSet = many('01_suzhou', 12, 24);
  const embraceSet = pick('02_embrace', 3);
  const collabSet = many('02_collab', 14, 30);
  const rhythmSet = many('02_rhythm', 18, 34);
  const careSet = many('02_care', 14, 32);
  const professionalSet = pick('03_professional', 3);
  const warmthSet = many('03_warmth', 16, 32);
  const techSet = many('03_tech', 20, 40);
  const responsibilitySet = many('03_responsibility', 12, 24);
  const customerSet = pick('04_customer', 3);
  const valueSet = many('04_value', 16, 32);
  const extraStepSet = many('04_extra', 16, 32);
  const cultureSet = many('04_culture', 24, 46);
  const realVoiceSet = many('05_real', 16, 28);
  const cultureLightSet = many('05_culture', 12, 20);
  const stageSet = many('05_stage', 24, 44);
  const highlightSet = many('05_highlight', 24, 50);
  const learnSet = pick('06_learn', 3);
  const workSet = many('06_work', 16, 32);
  const suzhouFutureSet = many('06_suzhou', 12, 24);
  const sailSet = many('06_sail', 18, 32);
  const valuesSet = many('07_values', 24, 48);
  const finaleSet = pick('07_finale', 1);
  const mainVideo = manifest.video || './素材/视频/成果舞台.mp4';
  window.STORY_CONFIG = {
    settings: {
      title: '招聚韶华 向阳启航｜招商银行苏州分行2026届新员工培训成长纪实',
      subtitle: '历时一月全维度淬炼，148名新员工完成从校园学子到金融职场新人的身份蜕变，在姑苏大地开启招银新征程。',
      author: '招商银行苏州分行 · 2026届新员工培训成长纪实',
      theme: '招聚韶华 向阳启航',
      autoplay: true,
      loop: false,
      defaultDurationMs: 8200,
      defaultSpeed: 1.5,
      transitionMs: 1120,
      music: manifest.audio || './素材/音频/背景音乐.wav',
      musicVolume: 0.34,
      videoMusicVolume: 0.07,
      randomSeed: 20260718,
      brandHeaderLogo: manifest.brand?.header || './素材/品牌/招商银行横版标识.png',
      brandWatermark: manifest.brand?.watermark || './素材/品牌/招商银行水印.png',
      brandEmblem: manifest.brand?.emblem || './素材/品牌/招商银行行徽.png',
      brandEmblemMask: manifest.brand?.emblemMask || './素材/品牌/招商银行行徽遮罩.png',
    },
    chapters: [
      { id: 'opening', number: '00', title: '序章 · 因招而聚', subtitle: '奔赴苏州 · 共启新程', startPageId: 'opening-depart' },
      { id: 'vision', number: '01', title: '第一章 · 见远', subtitle: '招商血脉 · 因势而变', startPageId: 'vision-shekou' },
      { id: 'wave', number: '02', title: '第二章 · 成浪', subtitle: '海辽精神 · 汇聚成海', startPageId: 'team-embrace' },
      { id: 'skills', number: '03', title: '第三章 · 先行', subtitle: '专业 · 温度 · 创新｜早一点 · 快一点 · 好一点', startPageId: 'professional-foundation' },
      { id: 'customer', number: '04', title: '第四章 · 向您', subtitle: '因您而变 · 价值为先', startPageId: 'customer-side' },
      { id: 'bloom', number: '05', title: '第五章 · 盛放', subtitle: '金葵花开 · 青春作答', startPageId: 'real-voice' },
      { id: 'sunward', number: '06', title: '尾章 · 向阳', subtitle: '价值上岗 · 向新而行', startPageId: 'learn-in-training' },
    ],
    pages: [
      {
        id: 'cover', chapterId: 'home', pageLabel: '首页', layout: 'cover', transition: 'book-open', reveal: 'cover', durationMs: 7000,
        kicker: 'CHINA MERCHANTS BANK SUZHOU BRANCH · 2026 NEW EMPLOYEE STORY',
        title: '招聚韶华\n向阳启航',
        subtitle: '招商银行苏州分行2026届新员工培训成长纪实',
        headline: '因招而聚 · 因您而变',
        body: '历时一月的“新兵训练营”落下帷幕，148名新员工从五湖四海汇聚姑苏。在战略领航、专业强基、文化铸魂的全维度培育中，我们完成了从校园学子到金融职场新人的第一次成长蜕变。',
        meta: '2026届新员工培训成长纪实',
        media: [departSet[0]],
      },
      {
        id: 'opening-depart', chapterId: 'opening', pageLabel: '奔赴苏州', layout: 'origin-map', transition: 'paper-sweep', reveal: 'origin-map', durationMs: 11200,
        chapterNumber: '00.1', kicker: 'GATHER IN SUZHOU', title: '奔赴苏州',
        subtitle: '奔赴苏州 · 共启新程',
        body: '跨越山海，逐光而来。来自全国各地高校的148名应届毕业生，怀揣对金融职场的憧憬与期待，陆续奔赴苏州，奔赴招商银行苏州分行的全新舞台。地图上延伸的轨迹，串联起各自的青春来路，也指向同一段并肩前行的招银旅程。',
        culture: '因招而聚，共赴韶华之约',
        media: departSet,
      },
      {
        id: 'opening-meet', chapterId: 'opening', pageLabel: '因招相识', layout: 'stack-deck', transition: 'camera-push', reveal: 'stack-deal', durationMs: 9800,
        chapterNumber: '00.2', kicker: 'MEET BY CMB', title: '因招相识',
        body: '签到领证、破冰分组、初次自我介绍，一张张青涩的面孔从陌生到熟悉，一个个名字从生疏到铭记。因为招商银行，我们拥有了共同的新身份——苏州分行2026届新员工，也开启了属于我们的集体成长故事。',
        media: meetSet,
      },
      {
        id: 'opening-group', chapterId: 'opening', pageLabel: '同框启程', layout: 'hero-mosaic', transition: 'page-lift', reveal: 'mosaic-cascade', durationMs: 9800,
        chapterNumber: '00.3', kicker: 'START TOGETHER', title: '同框启程',
        body: '第一张全员合影，将148颗年轻的心紧紧联结。从“新兵训练营”开营起，我们正式集结，共赴招银之约。',
        heroIndex: 0,
        media: groupSet,
      },
      {
        id: 'vision-shekou', chapterId: 'vision', pageLabel: '蛇口启新', layout: 'chapter-opener', transition: 'ink-fade', reveal: 'editorial-rise', durationMs: 8600,
        chapterNumber: '01.1', kicker: 'SHEKOU ORIGIN', title: '蛇口启新',
        subtitle: '招商血脉 · 因势而变',
        body: '招行从深圳蛇口起步，自诞生之日便镌刻着“敢闯敢试、敢为天下先”的蛇口基因。培训课堂上，我们循着招行发展脉络溯源初心，读懂招商血脉里的实干底色，也接过了这份开拓进取的精神传承。',
        culture: '招商血脉 · 蛇口基因 · 海辽精神',
        media: shekouSet,
      },
      {
        id: 'vision-change', chapterId: 'vision', pageLabel: '因势而变', layout: 'dense-editorial', transition: 'paper-sweep', reveal: 'scatter-settle', durationMs: 10000,
        chapterNumber: '01.2', kicker: 'CHANGE WITH THE TIMES', title: '因势而变',
        body: '从一卡通开启储蓄新时代，到一网通领跑互联网金融，从零售银行深度转型到如今“AI First”的金融科技战略，招行始终因势而变、主动求变。这份“早一步、快一步”的先行意识，是我们入职第一课最深刻的认知。',
        media: changeSet,
      },
      {
        id: 'vision-longterm', chapterId: 'vision', pageLabel: '长期作答', layout: 'focus-wall', transition: 'camera-push', reveal: 'focus-tour', durationMs: 10800,
        chapterNumber: '01.3', kicker: 'LONG-TERM ANSWER', title: '长期作答',
        body: '一家银行能走多远，取决于对长期价值的坚守。从服务实体经济到深耕客户价值，从夯实风控底线到打磨服务品质，招行始终坚持做难而正确的事，以长期主义的定力穿越周期、行稳致远。',
        culture: '长期主义 · 稳健审慎',
        focusOrder: [0, 3, 6, 9, 12, 1],
        media: longtermSet,
      },
      {
        id: 'vision-suzhou', chapterId: 'vision', pageLabel: '扎根苏州', layout: 'film-ribbon', transition: 'page-lift', reveal: 'ribbon-flow', durationMs: 11200,
        chapterNumber: '01.4', kicker: 'ROOTED IN SUZHOU', title: '扎根苏州',
        body: '读懂总行战略，最终要落脚到脚下的土地。苏州分行正以“133能力体系”淬炼队伍、以“四化”转型领跑市场，深耕姑苏大地的每一个经营现场，都将是我们施展本领、成长成才的真实舞台。',
        media: suzhouRootSet,
      },
      {
        id: 'team-embrace', chapterId: 'wave', pageLabel: '海纳百川', layout: 'chapter-opener', transition: 'page-lift', reveal: 'editorial-rise', durationMs: 8200,
        chapterNumber: '02.1', kicker: 'EMBRACE DIFFERENCE', title: '海纳百川',
        subtitle: '海辽精神 · 同向成海',
        body: '不同的专业背景、不同的成长经历，汇聚成多元互补的青春力量。海辽精神的内核，是同向同行、包容共进，让每一份特长都能发挥价值，让每一种声音都能被听见，最终凝聚成推动团队向前的合力。',
        media: embraceSet,
      },
      {
        id: 'team-collab', chapterId: 'wave', pageLabel: '开放协同', layout: 'collab-network', transition: 'camera-push', reveal: 'network-build', durationMs: 11000,
        chapterNumber: '02.2', kicker: 'OPEN COLLABORATION', title: '开放协同',
        body: '班委自主管理、小组分工协作，从日常考勤到活动策划，从课堂研讨到任务攻坚，我们在自我管理中学会担当，在彼此补位中凝聚共识，让“开放协同”从文化理念落地为实实在在的行动。',
        culture: '自我管理 · 开放协同 · 同向发力',
        media: collabSet,
      },
      {
        id: 'team-rhythm', chapterId: 'wave', pageLabel: '同频成浪', layout: 'hero-mosaic', transition: 'paper-sweep', reveal: 'mosaic-cascade', durationMs: 10000,
        chapterNumber: '02.3', kicker: 'ONE RHYTHM', title: '同频成浪',
        body: '在拓展与小组研讨中，我们逐渐步调一致、形成默契。分散的微光汇聚成炬，零散的力量同频成浪。',
        heroIndex: 0,
        media: rhythmSet,
      },
      {
        id: 'team-care', chapterId: 'wave', pageLabel: '尊重关爱分享', layout: 'polaroid-life', transition: 'page-lift', reveal: 'polaroid-spread', durationMs: 10200,
        chapterNumber: '02.4', kicker: 'RESPECT · CARE · SHARE', title: '尊重关爱分享',
        body: '集体生日的惊喜、读书分享的共鸣、青年座谈的坦诚，还有日常里的互帮互助，让紧凑的培训时光满是温度。尊重个体、关爱同伴、分享成长，招行的人文关怀藏在每一处细节里，也让我们更快融入这个大家庭。',
        media: careSet,
      },
      {
        id: 'professional-foundation', chapterId: 'skills', pageLabel: '专业立身', layout: 'chapter-opener', transition: 'ink-fade', reveal: 'typewriter-rise', durationMs: 8400,
        chapterNumber: '03.1', kicker: 'PROFESSIONAL', title: '专业立身',
        subtitle: '专业 · 温度 · 创新',
        body: '专业是金融从业者的立身之本。公司金融、零售金融、运营操作、合规风控、消保服务……各条线业务骨干轮番授课，从基础制度到岗位实操，全方位筑牢从业根基，帮助我们快速搭建起全景式业务认知框架。',
        culture: '专业强基 · 早一点 · 快一点 · 好一点',
        media: professionalSet,
      },
      {
        id: 'service-warmth', chapterId: 'skills', pageLabel: '温度抵达', layout: 'dense-editorial', transition: 'paper-sweep', reveal: 'scatter-settle', durationMs: 9800,
        chapterNumber: '03.2', kicker: 'SERVICE WITH WARMTH', title: '温度抵达',
        body: '服务的温度，藏在每一个细节里。标准的服务礼仪、耐心的业务解答、主动的靠前一步，看似寻常的举手投足，传递的是招行“以客户为中心”的服务理念，也是让客户可感可知的专业与真诚。',
        media: warmthSet,
      },
      {
        id: 'tech-real', chapterId: 'skills', pageLabel: '科技向实', layout: 'particle-cloud', transition: 'ink-fade', reveal: 'particle-bloom', durationMs: 15400,
        chapterNumber: '03.3', kicker: 'TECH FOR REAL VALUE', title: '科技向实',
        body: '紧扣总行“AI First”战略，我们系统学习行内数字化工具与AI应用，亲手操作智能文案生成、数据辅助分析等功能。科技不是悬空的概念，而是赋能业务、提升效率、优化客户体验的实实在在的工具。',
        culture: '科创赋能 · 创新向实 · 为客户创造价值',
        media: techSet,
      },
      {
        id: 'career-responsibility', chapterId: 'skills', pageLabel: '担当在肩', layout: 'film-ribbon', transition: 'shutter', reveal: 'ribbon-flow', durationMs: 11200,
        chapterNumber: '03.4', kicker: 'TAKE RESPONSIBILITY', title: '担当在肩',
        body: '走出校园步入职场，变化的不仅是身份，更是责任与担当。从被动接收任务到主动思考解决，从关注个人表现到重视团队结果，我们在点滴历练中褪去青涩，向着实干、奋斗、靠谱的招银人目标稳步成长。',
        culture: '担当有为 · 结果导向 · 知行合一',
        media: responsibilitySet,
      },
      {
        id: 'customer-side', chapterId: 'customer', pageLabel: '客户身边', layout: 'chapter-opener', transition: 'page-lift', reveal: 'editorial-rise', durationMs: 8400,
        chapterNumber: '04.1', kicker: 'STAND WITH CUSTOMERS', title: '客户身边',
        subtitle: '因您而变 · 价值为先',
        body: '“以客户为中心”不是一句口号，而是要真正站在客户的立场，读懂他们的真实需求与潜在顾虑。学会换位思考，才能跳出流程看服务，真正做到想客户之所想、急客户之所急。',
        culture: '以客户为中心',
        media: customerSet,
      },
      {
        id: 'customer-value', chapterId: 'customer', pageLabel: '价值落地', layout: 'value-orbit', transition: 'camera-push', reveal: 'value-orbit', durationMs: 10200,
        chapterNumber: '04.2', kicker: 'CREATE REAL VALUE', title: '价值落地',
        body: '办完一笔业务，不等于做好一次服务。真正为客户创造价值，是用专业能力解决实际问题，用审慎判断守护资金安全，让每一次服务都能为客户带来实实在在的获得感。',
        culture: '为客户创造价值',
        media: valueSet,
      },
      {
        id: 'customer-extra', chapterId: 'customer', pageLabel: '多想一步', layout: 'service-steps', transition: 'paper-sweep', reveal: 'service-steps', durationMs: 10200,
        chapterNumber: '04.3', kicker: 'THINK ONE STEP FURTHER', title: '多想一步',
        body: '优质服务往往发生在标准动作之外。多问一句风险提示，多想一步后续需求，多做一次跟进回访，那些没说出口的需求、易被忽略的细节，恰恰是招行服务温度与专业度的最好体现。',
        media: extraStepSet,
      },
      {
        id: 'culture-action', chapterId: 'customer', pageLabel: '文化践行', layout: 'focus-wall', transition: 'camera-push', reveal: 'focus-tour', durationMs: 12000,
        chapterNumber: '04.4', kicker: 'CULTURE IN ACTION', title: '文化践行',
        body: '企业文化从来不是挂在墙上的标语，而是每一次选择的标尺。面对客户时的态度、处理业务时的原则、团队协作时的格局，一言一行的选择，都是招银文化最生动的具象表达。',
        culture: '因您而变 · 文化落地于每一次真实选择',
        mediaLimit: 16,
        focusOrder: [0, 3, 7, 11, 15, 5],
        media: cultureSet,
      },
      {
        id: 'real-voice', chapterId: 'bloom', pageLabel: '真实有声', layout: 'chapter-opener', transition: 'paper-sweep', reveal: 'editorial-rise', durationMs: 9000,
        chapterNumber: '05.1', kicker: 'REAL STORIES', title: '真实有声',
        subtitle: '金葵花开 · 青春作答',
        body: '结业汇演的舞台上，真实的服务案例被改编成情景剧，反诈维权的故事在演绎中生动重现。当抽象的合规理念、服务准则遇上具体的人物与场景，文化便有了鲜活的模样与打动人心的力量。',
        media: pick('05_real', 3),
      },
      {
        id: 'culture-light', chapterId: 'bloom', pageLabel: '文化有光', layout: 'video-editorial', transition: 'page-lift', reveal: 'cinema-reveal', waitForVideoEnd: true, durationMs: 15000,
        chapterNumber: '05.2', kicker: 'CULTURE IN LIGHT', title: '文化有光',
        body: '诗朗诵诉说招商血脉的初心传承，说唱演绎新时代青年的金融担当，古典舞晕染姑苏文化的雅致底蕴，行歌唱响全体新人的价值共鸣。我们用青春的方式解读招银文化，也用原创作品交出成长答卷。',
        culture: '招商血脉 · 海辽精神 · 蛇口基因 · 因您而变',
        media: [video(mainVideo, cultureLightSet[0].src, '成果舞台视频'), ...cultureLightSet.slice(0, 10)],
      },
      {
        id: 'stage-together', chapterId: 'bloom', pageLabel: '同心登台', layout: 'film-ribbon', transition: 'shutter', reveal: 'ribbon-flow', durationMs: 11800,
        chapterNumber: '05.3', kicker: 'ONE TEAM ON STAGE', title: '同心登台',
        body: '从节目策划到舞台调度，从台词打磨到道具筹备，整场汇演由新员工自编自导自演。一次次熬夜排练、一遍遍磨合调整，有人台前发光，有人幕后补位，并肩作战的过程，让团队情谊更加深厚。',
        media: stageSet,
      },
      {
        id: 'highlight-wall', chapterId: 'bloom', pageLabel: '人人闪光', layout: 'focus-wall', transition: 'camera-push', reveal: 'focus-tour', durationMs: 12600,
        chapterNumber: '05.4', kicker: 'EVERYONE SHINES', title: '人人闪光',
        body: '聚光灯下的高光时刻，属于每一个全力以赴的人。课堂上的认真思考、竞赛中的奋勇争先、团队里的默默付出，所有努力都有回响，每一份坚守都在闪光。',
        mediaLimit: 16,
        focusOrder: [0, 3, 6, 10, 15, 5],
        media: highlightSet,
      },
      {
        id: 'learn-in-training', chapterId: 'sunward', pageLabel: '学成于训', layout: 'chapter-opener', transition: 'page-lift', reveal: 'typewriter-rise', durationMs: 8600,
        chapterNumber: '06.1', kicker: 'LEARN IN TRAINING', title: '学成于训',
        subtitle: '价值上岗 · 向新而行',
        body: '一个月的集训落下帷幕，我们收获的不仅是业务知识与岗位技能，更是对招银文化的深度认同，对职业方向的清晰认知。所学所悟终将化为行动自觉，指引我们走上岗位、奔赴新程。',
        culture: '让所学成为所用，让认同化为行动',
        media: learnSet,
      },
      {
        id: 'use-at-work', chapterId: 'sunward', pageLabel: '用成于岗', layout: 'dense-editorial', transition: 'paper-sweep', reveal: 'scatter-settle', durationMs: 9800,
        chapterNumber: '06.2', kicker: 'USE AT WORK', title: '用成于岗',
        body: '培训的终点，是岗位实践的起点。专业功底扎不扎实、服务理念到不到位、科技工具用得好不好，都将在一线岗位的真实业务中接受检验，在客户的真实评价里得到答案。',
        media: workSet,
      },
      {
        id: 'future-suzhou', chapterId: 'sunward', pageLabel: '苏州启程', layout: 'suzhou-routes', transition: 'camera-push', reveal: 'suzhou-routes', durationMs: 10400,
        chapterNumber: '06.3', kicker: 'FROM SUZHOU', title: '苏州启程',
        body: '我们从五湖四海来到苏州，也将奔赴各个部门、支行与岗位。共同的集训记忆、一致的价值追求，会串联起每一位新招行人的成长路，也将汇聚成苏州分行高质量发展的青春动能。',
        media: suzhouFutureSet,
      },
      {
        id: 'sail-sunward', chapterId: 'sunward', pageLabel: '向阳启航', layout: 'hero-mosaic', transition: 'page-lift', reveal: 'mosaic-cascade', durationMs: 10200,
        chapterNumber: '06.4', kicker: 'SAIL TOWARD THE SUN', title: '向阳启航',
        body: '集训落幕，成长不止。愿我们眼中有光、心中有梦，以专业立身、以实干致远，在苏州这片热土上向阳启航。',
        heroIndex: 0,
        media: sailSet,
      },
      {
        id: 'values-convergence', chapterId: 'sunward', pageLabel: '招行价值', layout: 'values-convergence', transition: 'ink-fade', reveal: 'values-converge', durationMs: 19000,
        chapterNumber: '06.5', kicker: 'WHAT WE CARRY FORWARD', title: '以客户为中心\n为客户创造价值',
        body: '让价值见于行动，让专业与温度抵达每一位客户。',
        valueGroups: [
          { title: '因招而聚', values: ['招商血脉', '蛇口基因', '海辽精神', '开放协同'] },
          { title: '因您而变', values: ['长期主义', '稳健审慎', '专业', '温度', '创新', '尊重', '关爱', '分享', '早一点', '快一点', '好一点'] },
        ],
        values: ['招商血脉', '蛇口基因', '海辽精神', '开放协同', '长期主义', '稳健审慎', '专业', '温度', '创新', '尊重', '关爱', '分享', '早一点', '快一点', '好一点'],
        culture: '',
        media: valuesSet,
      },
      {
        id: 'finale', chapterId: 'sunward', pageLabel: '封底', layout: 'finale', transition: 'ink-fade', reveal: 'finale', durationMs: 9200,
        chapterNumber: '06.6', kicker: 'CHINA MERCHANTS BANK SUZHOU BRANCH · 2026',
        title: '招聚韶华\n向阳启航',
        subtitle: '招商银行苏州分行 · 2026届新员工培训成长纪实',
        media: finaleSet,
      },
    ],
  };
})();
